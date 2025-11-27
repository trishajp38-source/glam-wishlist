# 👗 FashionFit Wishlist App

A beautiful, modern full-stack fashion wishlist application built with React, TypeScript, Tailwind CSS, and Lovable Cloud (Supabase).

## ✨ Features

- **Elegant Pink Design**: Beautiful, girly, and minimal UI with the Orchid theme
- **Add Fashion Items**: Save your dream fashion items with name, category, price, and description
- **View Latest Item**: Display the most recently added fashion item in a stunning card layout
- **Form Validation**: Complete client-side validation for all inputs
- **Real-time Updates**: Instant feedback with toast notifications
- **Responsive Design**: Works perfectly on all devices

## 🎨 Pages

### 1. Home Page (`/`)
- Welcome screen with navigation options
- Quick access to add items or view latest item
- Category showcase with icons

### 2. Wishlist Form (`/form`)
- Add new fashion items to your wishlist
- Fields:
  - **Item Name**: Name of the fashion item
  - **Category**: Dropdown (Dress, Shoes, Accessories, Other)
  - **Price**: Price in Indian Rupees (₹)
  - **Description**: Detailed description of the item
- Form validation with error messages
- Success notification on submission
- Auto-redirect to view page after successful submission

### 3. View Latest Item (`/view`)
- Displays the most recently added fashion item
- Beautiful card design with:
  - Category icon
  - Item name
  - Price (₹)
  - Description
  - Date added
- Options to return to form or refresh data
- Empty state when no items exist

## 🗄️ Database Schema

**Table Name**: `fashion_wishlist`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `item_name` | TEXT | Name of the fashion item |
| `category` | TEXT | Category (Dress, Shoes, Accessories, Other) |
| `price` | NUMERIC(10,2) | Price of the item |
| `description` | TEXT | Detailed description |
| `created_at` | TIMESTAMP | Creation timestamp (auto-generated) |

### Row Level Security (RLS)
- **Public Read Access**: Anyone can view all fashion items
- **Public Insert Access**: Anyone can add new fashion items

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Orchid theme
- **UI Components**: shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router v6

## 🎨 Design System

The app uses a beautiful pink-themed design system:
- **Primary Color**: Pink/Magenta (`--primary: 333 71% 50%`)
- **Accent Color**: Light Pink (`--accent: 355 100% 97%`)
- **Typography**: Poppins font family
- **Border Radius**: 1.5rem for rounded, elegant look
- **Shadows**: Custom shadow system for depth

## 📱 Routes

- `/` - Home page
- `/form` - Add new fashion item
- `/view` - View latest fashion item
- `*` - 404 Not Found page

## 🔧 Key Components

### WishlistForm Component
- Full form validation with Zod schema
- Category dropdown with 4 options
- Price input with numeric validation
- Textarea for descriptions
- Loading states during submission
- Success/error toast notifications

### ViewItem Component
- Fetches latest item from database
- Beautiful card layout with gradient header
- Category-specific icons
- Formatted date display
- Refresh functionality
- Empty state handling

## 💾 Database Functions

The app interacts with Lovable Cloud through the Supabase client:

```typescript
// Add new fashion item
await supabase.from("fashion_wishlist").insert({
  item_name: string,
  category: string,
  price: number,
  description: string
});

// Fetch latest item
await supabase
  .from("fashion_wishlist")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(1)
  .single();
```

## 🎯 Future Enhancements

- User authentication for personal wishlists
- Edit and delete functionality
- View all items in a gallery
- Filter and search capabilities
- Image upload for fashion items
- Price tracking and notifications
- Share wishlist with friends

## 📝 Notes

- All colors use HSL format for theming
- Form validation prevents invalid data
- Database has proper indexes for performance
- RLS policies ensure data security
- Responsive design works on all screen sizes

---

**Built with ❤️ using Lovable**
