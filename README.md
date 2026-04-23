# SafeStart E-Commerce Assessment

A professional, high-performance E-Commerce application built for the SafeStart Frontend Developer assessment. This project demonstrates modern React best practices, state management with Redux Toolkit, and a premium, responsive UI/UX.

## 🌐 Live Demo
**URL**: [https://safestart-react-task-f3y02h44d-prasanth1828s-projects.vercel.app/](https://safestart-react-task-f3y02h44d-prasanth1828s-projects.vercel.app/)

## 🚀 Features

- **Authentication**: Secure login and signup flow with form validation.
- **Product Catalog**: Dynamic product listing fetched from JSON data.
- **Redux State Management**: Centralized user and cart state management.
- **Shopping Cart**: Fully functional cart with add, remove, and quantity update features.
- **Success Workflow**: Animated order success state with unique order ID generation.
- **Responsive Design**: Mobile-first approach, fully optimized for all screen sizes.
- **Performance**: Optimized with code-splitting (React.lazy) and custom hooks.

## 🛠️ Tech Stack

- **Core**: React 18 (Vite)
- **State**: Redux Toolkit
- **Routing**: React Router 6.4 (Data APIs)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Variables & Modern Flexbox/Grid)
- **Notifications**: React Hot Toast

## 🔑 Demo Credentials

To access the application, you can use the following default credentials:

- **Email**: `admin@safestart.com` 
- **Password**: `123456` 

*Alternatively, you can use the Signup feature to create a new account.* 

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

## 🏗️ Architecture Decisions

- **Custom Hooks**: Encapsulated Redux logic into `useAuth` and `useCart` hooks for cleaner components and better reusability.
- **Modular Components**: Split large pages into smaller, focused components (e.g., `ProductCard`, `CartItem`) for maintainability.
- **Design System**: Used a cohesive color palette and global CSS variables for a consistent, premium look-and-feel.
- **Data Persistence**: Implemented session management to ensure a smooth user experience during navigation.

---

**Candidate**: PRASANTH R  
**Role**: Frontend Developer Assessment (SafeStart)
