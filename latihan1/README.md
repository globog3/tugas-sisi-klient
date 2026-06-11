# Admin Dashboard - React with Atomic Design

Proyek React untuk membuat halaman Login dan Admin dengan implementasi Atomic Design Pattern.

## Struktur Proyek

```
src/
+-- components/
¦   +-- atoms/          # Komponen dasar
¦   ¦   +-- Input.jsx
¦   ¦   +-- Button.jsx
¦   ¦   +-- Label.jsx
¦   +-- molecules/      # Kombinasi atoms
¦   ¦   +-- Card.jsx
¦   ¦   +-- Form.jsx
¦   +-- organisms/      # Kombinasi kompleks
¦       +-- Header.jsx
¦       +-- Sidebar.jsx
¦       +-- Footer.jsx
¦       +-- Modal.jsx
+-- layouts/            # Layout templates
¦   +-- AuthLayout.jsx
¦   +-- AdminLayout.jsx
+-- pages/              # Halaman aplikasi
¦   +-- Login.jsx
¦   +-- Admin.jsx
+-- App.jsx
+-- main.jsx
+-- index.css
```

## Instalasi

```bash
npm install
```

## Menjalankan Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Build untuk Production

```bash
npm run build
```

## Fitur

### 1. Login Page
- Form login dengan email dan password
- Tombol "Ingat saya" dan "Lupa password?"
- Responsive design dengan Tailwind CSS
- Navigasi otomatis ke halaman admin setelah login

### 2. Admin Page
- Dashboard dengan sidebar navigasi
- Tabel daftar mahasiswa
- Modal untuk menambah mahasiswa baru
- Tombol Edit dan Hapus
- Responsive design

### 3. Atomic Design Pattern

**Atoms (Komponen Dasar):**
- `Input` - Input field dengan styling konsisten
- `Button` - Tombol dengan berbagai varian (primary, secondary, danger, warning, success)
- `Label` - Label form

**Molecules (Kombinasi Atoms):**
- `Card` - Container dengan styling
- `Form` - Wrapper form

**Organisms (Kombinasi Kompleks):**
- `Header` - Header area dengan title dan content kanan
- `Sidebar` - Navigasi sidebar dengan menu items
- `Footer` - Footer area
- `Modal` - Dialog modal dengan title, content, dan actions

**Layouts:**
- `AuthLayout` - Layout untuk halaman autentikasi (centered, light background)
- `AdminLayout` - Layout untuk halaman admin (sidebar + header + content + footer)

## Teknologi yang Digunakan

- **React 18** - UI library
- **React Router DOM 6** - Routing dan navigation
- **Tailwind CSS 3** - Styling dengan utility classes
- **Vite** - Build tool dan development server

## Routes

- `/` - Login page
- `/login` - Login page
- `/admin` - Admin page dengan management mahasiswa

## Komponen yang Digunakan

### Input
- Props: type, placeholder, value, onChange, className
- Styling: Border biru saat focus, padding, rounded corners

### Button
- Props: children, onClick, variant, size, className, disabled
- Variants: primary, secondary, danger, warning, success
- Sizes: sm, md, lg, full

### Label
- Props: children, htmlFor, className
- Styling: Text kecil, font medium, warna abu-abu

### Card
- Props: children, className, title
- Styling: Background putih, shadow, rounded corners

### Form
- Props: children, onSubmit, className

### Header
- Props: title, rightContent, className
- Menampilkan judul halaman dan content custom di sebelah kanan

### Sidebar
- Props: items, activeItem, onItemClick, className
- Menampilkan navigasi menu dengan highlight untuk item aktif

### Footer
- Props: content, className
- Menampilkan copyright atau informasi footer

### Modal
- Props: isOpen, onClose, title, children, actions, className
- Menampilkan dialog dengan overlay dan custom actions

## Lisensi

MIT
