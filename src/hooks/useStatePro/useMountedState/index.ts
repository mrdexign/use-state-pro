import { useState } from 'react';
import useMounted from './useMounted';

const useMountedState = <T = undefined>(initState?: T | (() => T)) => {
	const { isMounted } = useMounted();

	const [state, setState] = useState<T>(initState as any);

	const newSetState: (v: React.SetStateAction<T>) => void = value => {
		if (!isMounted.current) return;
		setState(value);
	};

	return [state, newSetState] as [T, React.Dispatch<React.SetStateAction<T>>];
};

export default useMountedState;
