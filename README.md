# React Native Toaster

A lightweight, customizable toast notification system for React Native applications.

## Features

- 🎨 Multiple toast variants (default, success, error, warning, info)
- ⏱️ Configurable display duration
- 🔄 Smooth animations
- 🧩 Simple API with React hooks
- 📱 Fully compatible with React Native

## Installation

```bash
npm install react-native-toaster-ui
# or
yarn add react-native-toaster-ui
```

### Optional Dependencies

This package can use `lucide-react-native` for icons, but it's optional:

```bash
npm install lucide-react-native
# or
yarn add lucide-react-native
```

If you're using React 19 with React Native 0.78.0 or newer, you may need to install with the `--force` flag due to compatibility issues with some versions of lucide-react-native:

```bash
npm install lucide-react-native --force
# or
yarn add lucide-react-native --force
```

## Usage

### 1. Wrap your app with the ToastProvider

```jsx
import { ToastProvider } from 'react-native-toaster-ui';

export default function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
}
```

## Customization

The toast notifications use predefined styles with appropriate colors for each variant:

- **Default**: White background
- **Success**: Light green background
- **Error**: Light red background
- **Warning**: Light yellow background
- **Info**: Light blue background

### useToast Hook

```code
const { toast, dismiss } = useToast();
```
## toast(options)

Shows a toast notification with the given options.

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| title | string | The title of the toast | - |
| description | string | The description text | - |
| variant | 'default' \| 'success' \| 'error' \| 'warning' \| 'info' | The visual style of the toast | 'default' |
| duration | number | Duration in milliseconds before auto-dismissing | 5000 |

Returns a unique ID that can be used to dismiss the toast.
## dismiss(id)

Dismisses a specific toast by its ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | The ID of the toast to dismiss |

## License

[MIT](https://choosealicense.com/licenses/mit/)

