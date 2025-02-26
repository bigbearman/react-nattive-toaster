# React Native Toaster

A lightweight, customizable toast notification system for React Native applications.




## Installation

Install my-project with npm

```bash
    npm install react-native-toaster
    or
    yarn add react-native-toaster
```
    
## Features

- 🎨 Multiple toast variants (default, success, error, warning, info)
- ⏱️ Configurable display duration
- 🔄 Smooth animations
- 🧩 Simple API with React hooks
- 📱 Fully compatible with React Native


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

