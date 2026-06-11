# ??? Atomic Design Architecture

## Visual Component Hierarchy

```
+-------------------------------------------------------------+
¦                      PAGES (Full Pages)                      ¦
¦  +------------------------------------------------------+   ¦
¦  ¦  Login Page              ¦     Admin Page            ¦   ¦
¦  ¦  - Form Login           ¦     - Table CRUD          ¦   ¦
¦  ¦  - Card Container       ¦     - Modal Management    ¦   ¦
¦  +------------------------------------------------------+   ¦
+-------------------------------------------------------------+
                            ? Uses
+-------------------------------------------------------------+
¦                     LAYOUTS (Templates)                      ¦
¦  +------------------------------------------------------+   ¦
¦  ¦  AuthLayout                    AdminLayout           ¦   ¦
¦  ¦  - Centered                    - Sidebar            ¦   ¦
¦  ¦  - Light Background            - Header             ¦   ¦
¦  ¦                                - Footer             ¦   ¦
¦  +------------------------------------------------------+   ¦
+-------------------------------------------------------------+
                            ? Uses
+-------------------------------------------------------------+
¦                 ORGANISMS (Complex Sections)                ¦
¦  +----------+  +----------+  +----------+  +----------+   ¦
¦  ¦  Header  ¦  ¦ Sidebar  ¦  ¦ Modal    ¦  ¦  Footer  ¦   ¦
¦  ¦ (Title,  ¦  ¦ (Menu    ¦  ¦ (Dialog, ¦  ¦ (Copy,   ¦   ¦
¦  ¦ Profile) ¦  ¦  Items)  ¦  ¦ Actions) ¦  ¦ Links)   ¦   ¦
¦  +----------+  +----------+  +----------+  +----------+   ¦
+-------------------------------------------------------------+
                            ? Uses
+-------------------------------------------------------------+
¦                MOLECULES (Component Groups)                  ¦
¦  +---------------------+  +---------------------+          ¦
¦  ¦  Card               ¦  ¦  Form               ¦          ¦
¦  ¦  - Container        ¦  ¦  - Form Wrapper     ¦          ¦
¦  ¦  - Shadow           ¦  ¦  - Submit Handler   ¦          ¦
¦  ¦  - Padding          ¦  ¦                     ¦          ¦
¦  +---------------------+  +---------------------+          ¦
+-------------------------------------------------------------+
                            ? Uses
+-------------------------------------------------------------+
¦                  ATOMS (Basic Elements)                      ¦
¦  +----------+  +----------+  +----------+                  ¦
¦  ¦  Input   ¦  ¦ Button   ¦  ¦  Label   ¦                  ¦
¦  ¦ (Field)  ¦  ¦ (Action) ¦  ¦ (Text)   ¦                  ¦
¦  +----------+  +----------+  +----------+                  ¦
+-------------------------------------------------------------+
```

## Component Tree

```
App (Router)
+-- Route: /
¦   +-- Login Page
¦       +-- AuthLayout
¦           +-- Card
¦               +-- Form
¦                   +-- Label + Input (Email)
¦                   +-- Label + Input (Password)
¦                   +-- Checkbox + Link
¦                   +-- Button (primary, full)
¦
+-- Route: /admin
    +-- Admin Page
        +-- AdminLayout
            +-- Sidebar
            ¦   +-- Button (menu items)
            +-- Header
            ¦   +-- Avatar (profile)
            +-- Card (content)
            ¦   +-- Button (add)
            ¦   +-- Table
            ¦       +-- Button (edit/delete)
            +-- Modal
            ¦   +-- Form
            ¦       +-- Label + Input (NIM)
            ¦       +-- Label + Input (Nama)
            ¦       +-- Button (save)
            +-- Footer
```

## File Organization Pattern

```
Atomic Design Pyramid:
        
        ?
        ¦
        ¦  PAGES         (5 Components) - Complete pages/views
        ¦
        ¦  LAYOUTS       (2 Components) - Page templates
        ¦
        ¦  ORGANISMS     (4 Components) - Complex sections
        ¦
        ¦  MOLECULES     (2 Components) - Component groups
        ¦
        ¦  ATOMS         (3 Components) - Basic elements
        ¦
        +--------------------------------

Structure:
src/
+-- pages/          ? Full page components (Login, Admin)
+-- layouts/        ? Layout templates (Auth, Admin)
+-- components/
¦   +-- organisms/  ? Complex components
¦   +-- molecules/  ? Component combinations
¦   +-- atoms/      ? Basic elements
+-- App.jsx         ? Router
```

## Component Reusability Matrix

```
+---------------------------------------------------------+
¦              Reusability Across Project                 ¦
+--------------------------------------------------------¦
¦ Component    ¦ Frequency    ¦ Projects                 ¦
+--------------+--------------+--------------------------¦
¦ Button       ¦ ?????       ¦ Nearly every page       ¦
¦ Input        ¦ ?????       ¦ Forms, modals           ¦
¦ Label        ¦ ?????       ¦ Forms, inputs           ¦
¦ Card         ¦ ?????       ¦ Dashboards, lists       ¦
¦ Form         ¦ ?????       ¦ Login, modals           ¦
¦ Header       ¦ ?????       ¦ All pages               ¦
¦ Sidebar      ¦ ?????       ¦ Admin pages             ¦
¦ Modal        ¦ ?????       ¦ Dialogs, confirmations  ¦
¦ Footer       ¦ ?????       ¦ All pages               ¦
+--------------------------------------------------------+
```

## Component Dependencies

```
Modal
+-- Button (atom)
+-- Form (molecule)
    +-- Label (atom)
    +-- Input (atom)

Card
+-- Title (text)
+-- Children (any content)

Form
+-- Children (inputs, etc)
+-- onSubmit handler

Sidebar
+-- Button (for menu items)
+-- Array of menu items

Header
+-- Title (text)
+-- rightContent (custom JSX)

Footer
+-- content (text)
```

## Total Components Created

| Category  | Count | Names                           |
|-----------|-------|---------------------------------|
| Atoms     | 3     | Input, Button, Label            |
| Molecules | 2     | Card, Form                      |
| Organisms | 4     | Header, Sidebar, Footer, Modal  |
| Layouts   | 2     | AuthLayout, AdminLayout         |
| Pages     | 2     | Login, Admin                    |
| **Total** | **13** | **Fully functional components** |

---

## Key Points

? **Single Responsibility** - Each component has one purpose
? **Composable** - Components combine to create pages
? **Reusable** - Atoms/Molecules used across pages
? **Scalable** - Easy to add new components
? **Maintainable** - Clear structure and hierarchy
? **Testable** - Each level can be tested independently

