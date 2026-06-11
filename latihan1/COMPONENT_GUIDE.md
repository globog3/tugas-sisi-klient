# Component Usage Guide

## Atoms - Basic Building Blocks

### Input Component
```jsx
import Input from "@/components/atoms/Input"

<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Props:**
- `type` (default: "text") - input type
- `placeholder` - placeholder text
- `value` - controlled value
- `onChange` - change handler
- `className` - additional CSS classes

---

### Button Component
```jsx
import Button from "@/components/atoms/Button"

// Basic
<Button onClick={() => alert("Clicked!")}>Click Me</Button>

// With variant
<Button variant="danger" size="md">Delete</Button>

// Full width
<Button variant="primary" size="full">Submit</Button>

// Disabled
<Button disabled>Disabled</Button>
```

**Props:**
- `children` - button text/content
- `onClick` - click handler
- `variant` - "primary" | "secondary" | "danger" | "warning" | "success"
- `size` - "sm" | "md" | "lg" | "full"
- `className` - additional CSS classes
- `disabled` - disable button

---

### Label Component
```jsx
import Label from "@/components/atoms/Label"

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

**Props:**
- `children` - label text
- `htmlFor` - associated input id
- `className` - additional CSS classes

---

## Molecules - Component Combinations

### Card Component
```jsx
import Card from "@/components/molecules/Card"

// Basic
<Card>
  <p>Content here</p>
</Card>

// With title
<Card title="User Information">
  <p>User details...</p>
</Card>

// Custom styling
<Card className="border-2 border-blue-500">
  Custom card
</Card>
```

**Props:**
- `children` - card content
- `title` - optional card title
- `className` - additional CSS classes

---

### Form Component
```jsx
import Form from "@/components/molecules/Form"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"

<Form onSubmit={handleSubmit}>
  <Input 
    type="email" 
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <Button type="submit">Submit</Button>
</Form>
```

**Props:**
- `children` - form content
- `onSubmit` - submit handler
- `className` - additional CSS classes

---

## Organisms - Complex Components

### Header Component
```jsx
import Header from "@/components/organisms/Header"

<Header 
  title="Dashboard"
  rightContent={<img src="avatar.jpg" />}
/>
```

**Props:**
- `title` - page title
- `rightContent` - JSX for right side (profile, notifications, etc)
- `className` - additional CSS classes

---

### Sidebar Component
```jsx
import Sidebar from "@/components/organisms/Sidebar"
import { useState } from "react"

function MyPage() {
  const [activeItem, setActiveItem] = useState("dashboard")
  
  const items = [
    { id: "dashboard", label: "?? Dashboard" },
    { id: "users", label: "?? Users" },
    { id: "settings", label: "?? Settings" }
  ]
  
  return (
    <Sidebar
      items={items}
      activeItem={activeItem}
      onItemClick={(item) => setActiveItem(item.id)}
    />
  )
}
```

**Props:**
- `items` - array of menu items [{id, label, icon}]
- `activeItem` - currently active item id
- `onItemClick` - handler when item clicked
- `className` - additional CSS classes

---

### Footer Component
```jsx
import Footer from "@/components/organisms/Footer"

<Footer content="© 2024 My Company. All rights reserved." />

// Custom content
<Footer>
  <div className="flex justify-between">
    <p>© 2024</p>
    <a href="#">Privacy Policy</a>
  </div>
</Footer>
```

**Props:**
- `content` - footer text (default copyright)
- `className` - additional CSS classes

---

### Modal Component
```jsx
import Modal from "@/components/organisms/Modal"
import Button from "@/components/atoms/Button"
import { useState } from "react"

function MyPage() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        actions={
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  )
}
```

**Props:**
- `isOpen` - modal visibility
- `onClose` - close handler
- `title` - modal title
- `children` - modal content
- `actions` - custom action buttons
- `className` - additional CSS classes

---

## Layouts

### AuthLayout
```jsx
import AuthLayout from "@/layouts/AuthLayout"
import Card from "@/components/molecules/Card"
import Form from "@/components/molecules/Form"

export default function Login() {
  return (
    <AuthLayout>
      <Card className="w-96">
        <Form onSubmit={handleLogin}>
          {/* form content */}
        </Form>
      </Card>
    </AuthLayout>
  )
}
```

**For:** Login, Register, Forgot Password pages

---

### AdminLayout
```jsx
import AdminLayout from "@/layouts/AdminLayout"
import Card from "@/components/molecules/Card"

export default function Dashboard() {
  const sidebarItems = [
    { id: "dashboard", label: "?? Dashboard" },
    { id: "users", label: "?? Users" }
  ]
  
  return (
    <AdminLayout title="Dashboard" sidebarItems={sidebarItems}>
      <Card title="Welcome">
        <p>Welcome to the admin dashboard</p>
      </Card>
    </AdminLayout>
  )
}
```

**For:** Admin pages with navigation

**Props:**
- `children` - page content
- `title` - page title (shown in header)
- `sidebarItems` - navigation items

---

## Complete Example

```jsx
import { useState } from "react"
import Card from "@/components/molecules/Card"
import Form from "@/components/molecules/Form"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import Label from "@/components/atoms/Label"

export default function UserForm() {
  const [name, setName] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted:", name)
    setName("")
  }
  
  return (
    <Card title="User Information">
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <Button type="submit" variant="primary" size="full">
          Save
        </Button>
      </Form>
    </Card>
  )
}
```
