import OBJ from '../../utils/OBJ';
import { OBJECT, SUG } from '../../global';
import useMountedState from './useMountedState';
import { useEffect, SetStateAction, useMemo } from 'react';

const useStatePro = <T extends OBJECT = OBJECT<any>>(in_state: T, dependencies: any[] = []) => {
	const [org, setInOrg] = useMountedState<T>(OBJ.clone(in_state));
	const [tmp, setInTmp] = useMountedState<T>(OBJ.clone(in_state));

	//? ------------------------------ useEffect ------------------------------------------------

	useEffect(() => {
		const cloned = OBJ.clone(in_state);
		if (OBJ.equals(cloned, org)) return;
		setInTmp(cloned);
		setInOrg(cloned);
	}, dependencies);

	useEffect(() => {
		if (OBJ.equals(tmp, org)) return;
		setInTmp(OBJ.clone(org));
	}, [org]);

	//? ------------------------------ vars --------------------------------------------------

	const changed = useMemo(() => !OBJ.equals(org, tmp), [org, tmp]);

	//? ---------------------------------- utils ------------------------------------------------

	function setOrg(state: StateDispatch<T>): void;
	function setOrg(key: SUG<NestedKeyOf<T>>, value: StateDispatch<any>): void;
	function setOrg(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setInOrg(p1 as any);
		if (arguments.length === 2) return setInOrg(s => OBJ.set(OBJ.clone(s), p1 as any, p2));
	}

	function setTmp(state: StateDispatch<T>): void;
	function setTmp(key: SUG<NestedKeyOf<T>>, value: StateDispatch<any>): void;
	function setTmp(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setInTmp(p1 as any);
		if (arguments.length === 2) return setInTmp(s => OBJ.set(OBJ.clone(s), p1 as any, p2));
	}

	function getOrg(key: SUG<NestedKeyOf<T>>) {
		return OBJ.get(org, key);
	}

	function getTmp(key: SUG<NestedKeyOf<T>>) {
		return OBJ.get(tmp, key);
	}

	return {
		tmp,
		org,
		changed,
		discard: () => setInTmp(org),
		set: { org: setOrg, tmp: setTmp },
		get: { org: getOrg, tmp: getTmp },
		merge: () => setInOrg(OBJ.clone(tmp)),
	};
};

export type NestedKeyOf<O extends Record<string, unknown>> = {
	[K in Extract<keyof O, string>]: O[K] extends Array<any>
		? K
		: O[K] extends Record<string, unknown>
		? `${K}` | `${K}.${NestedKeyOf<O[K]>}`
		: K;
}[Extract<keyof O, string>];

type StateDispatch<T = any> = SetStateAction<T>;

export default useStatePro;
