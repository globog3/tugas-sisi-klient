# Quick Start Guide - React Admin Dashboard

## ? Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
```

## ?? Project Structure

```
latihan1-react/
+-- src/
¦   +-- components/
¦   ¦   +-- atoms/              ? Komponen dasar
¦   ¦   ¦   +-- Input.jsx       (Input field)
¦   ¦   ¦   +-- Button.jsx      (Button dengan variants)
¦   ¦   ¦   +-- Label.jsx       (Form label)
¦   ¦   ¦
¦   ¦   +-- molecules/          ? Kombinasi atoms
¦   ¦   ¦   +-- Card.jsx        (Container/Card)
¦   ¦   ¦   +-- Form.jsx        (Form wrapper)
¦   ¦   ¦
¦   ¦   +-- organisms/          ? Komponen kompleks
¦   ¦       +-- Header.jsx      (Top navigation)
¦   ¦       +-- Sidebar.jsx     (Side navigation)
¦   ¦       +-- Footer.jsx      (Footer)
¦   ¦       +-- Modal.jsx       (Dialog/Modal)
¦   ¦
¦   +-- layouts/
¦   ¦   +-- AuthLayout.jsx      (Layout untuk login)
¦   ¦   +-- AdminLayout.jsx     (Layout untuk admin)
¦   ¦
¦   +-- pages/
¦   ¦   +-- Login.jsx           (Halaman login)
¦   ¦   +-- Admin.jsx           (Halaman admin)
¦   ¦
¦   +-- App.jsx                 (Router setup)
¦   +-- main.jsx                (Entry point)
¦   +-- index.css               (Tailwind imports)
¦
+-- index.html                  (Root HTML)
+-- package.json                (Dependencies)
+-- vite.config.js              (Vite config)
+-- tailwind.config.js          (Tailwind config)
+-- README.md                   (Documentation)
```

## ?? Feature Highlights

### ? Login Page (`/login`)
- Email & password form
- Remember me checkbox
- Forgot password link
- Responsive centered layout
- Auto-navigate to admin after login

### ? Admin Dashboard (`/admin`)
- Sidebar navigation
- Student data table
- Add student modal
- Edit/Delete buttons
- Header with profile
- Footer

## ?? Atomic Design Components

### Atoms (Basic)
- `<Input />` - Text/email/password inputs
- `<Button />` - Multiple variants & sizes
- `<Label />` - Form labels

### Molecules
- `<Card />` - Content container
- `<Form />` - Form wrapper

### Organisms
- `<Header />` - Top navigation
- `<Sidebar />` - Side navigation
- `<Footer />` - Bottom section
- `<Modal />` - Dialog/popup

### Layouts
- `<AuthLayout />` - Centered for login
- `<AdminLayout />` - Full admin dashboard

## ?? Button Variants

```jsx
<Button variant="primary">Primary</Button>      // Blue
<Button variant="secondary">Secondary</Button>  // Gray
<Button variant="danger">Delete</Button>        // Red
<Button variant="warning">Edit</Button>         // Yellow
<Button variant="success">Save</Button>         // Green
```

## ?? Button Sizes

```jsx
<Button size="sm">Small</Button>       // px-3 py-1
<Button size="md">Medium</Button>      // px-4 py-2 (default)
<Button size="lg">Large</Button>       // px-6 py-3
<Button size="full">Full Width</Button> // w-full
```

## ?? Routing

- `/` ? Login page
- `/login` ? Login page
- `/admin` ? Admin dashboard

## ??? Tech Stack

- React 18 - UI Framework
- React Router 6 - Navigation
- Tailwind CSS 3 - Styling
- Vite - Build tool

## ?? Next Steps

1. Customize colors in `tailwind.config.js`
2. Add more sidebar items in `Admin.jsx`
3. Implement backend API integration
4. Add user authentication logic
5. Enhance modal with edit functionality

## ?? License

MIT
