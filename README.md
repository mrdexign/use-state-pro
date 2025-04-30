# `useStatePro` - State Management Like a Pro

![npm](https://img.shields.io/npm/v/use-state-pro)
![license](https://img.shields.io/npm/l/use-state-pro)
![downloads](https://img.shields.io/npm/dt/use-state-pro)

`useStatePro` is an enhanced React state management hook that provides temporary state management, change tracking, and nested object support with a simple API.

## Features

-   🏗️ **Temporary state** - Maintain a temporary copy of your state that can be discarded or merged
-   🔍 **Change tracking** - Automatically detect when temporary state differs from original state
-   🧩 **Nested object support** - Easily access and modify nested properties with dot notation
-   🔄 **State synchronization** - Keep state in sync with props via dependencies array
-   🛠️ **Utility functions** - Includes discard, merge, and getter/setter functions

## Installation

```bash
npm install use-state-pro
# or
yarn add use-state-pro
```

## Basic Usage

```jsx
import useStatePro from 'use-state-pro';

function UserForm({ user }) {
	const { tmp, org, changed, set, discard, merge } = useStatePro(user);

	const handleSave = () => {
		// Save to API then merge changes
		merge();
	};

	return (
		<div>
			<input value={tmp.name} onChange={e => set.tmp('name', e.target.value)} />

			{changed && (
				<div>
					<button onClick={discard}>Discard Changes</button>
					<button onClick={handleSave}>Save Changes</button>
				</div>
			)}
		</div>
	);
}
```

## API Reference

### Parameters

| Parameter      | Type    | Required | Description                                                                  |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| `in_state`     | `T`     | Yes      | Initial state object                                                         |
| `dependencies` | `any[]` | No       | Array of dependencies that trigger state reset when changed (like useEffect) |

### Return Object

| Property  | Type      | Description                                                           |
| --------- | --------- | --------------------------------------------------------------------- |
| `tmp`     | `T`       | The temporary state object                                            |
| `org`     | `T`       | The original state object                                             |
| `changed` | `boolean` | True if `tmp` differs from `org`                                      |
| `set.tmp` | function  | Setter for temporary state (supports dot notation for nested objects) |
| `set.org` | function  | Setter for original state (supports dot notation for nested objects)  |
| `get.tmp` | function  | Getter for temporary state (supports dot notation for nested objects) |
| `get.org` | function  | Getter for original state (supports dot notation for nested objects)  |
| `discard` | function  | Reset `tmp` to match `org`                                            |
| `merge`   | function  | Copy `tmp` to `org`                                                   |

## Advanced Usage

### Nested Object Access

```jsx
const { tmp, set, get } = useStatePro({
	user: {
		name: 'John',
		address: {
			city: 'New York',
		},
	},
});

// Set nested value
set.tmp('user.address.city', 'Los Angeles');

// Get nested value
const city = get.tmp('user.address.city'); // 'Los Angeles'
```

### Using with Dependencies

```jsx
function UserProfile({ user }) {
	// When the user prop changes, both org and tmp will update
	const state = useStatePro(user, [user]);

	// ... rest of component
}
```

### TypeScript Support

`useStatePro` is written in TypeScript and provides full type support:

```tsx
interface User {
	id: number;
	name: string;
	profile: {
		email: string;
		age?: number;
	};
}

const { tmp, set } = useStatePro<User>({
	id: 1,
	name: 'John',
	profile: {
		email: 'john@example.com',
	},
});

// Type-safe nested property access
set.tmp('profile.email', 'new@example.com');
```

## Why `useStatePro`?

-   **Form Management**: Perfect for complex forms where you need to track changes and allow cancellation
-   **Edit UIs**: Simplify edit workflows with built-in discard/merge functionality
-   **State Comparison**: Easily compare current state with original values
-   **Deep Updates**: No need to spread state manually for nested updates

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT © MrDexign
