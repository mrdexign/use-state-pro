import IS from './IS';
import dottie from 'dottie';
import { OBJECT } from '../global';
import equal from 'fast-deep-equal';

export default class OBJ {
	static keys = (obj: OBJECT) => Object.keys(obj || {});

	static values = (obj: OBJECT) => Object.values(obj || []);

	static entries = (obj: OBJECT) => Object.entries(obj || []);

	static isEmpty = (obj: OBJECT) => this.keys(obj).length === 0;

	static clone = <T extends object = any>(object: T) => structuredClone(object) as T;

	static equals = (...objects: object[]) => objects.every((obj, i) => i === 0 || equal(objects[0], obj));

	static get = (obj: object, key: string) => dottie.get(obj, key);

	/**
	 * @warning This is a mutable operation! It modifies the original object.
	 * If you need immutability, consider creating a copy first.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	static set = <T = OBJECT>(obj: T, key: string, value: any) => {
		if (IS.function(value)) value = value?.(OBJ.get(OBJ.clone(obj as any), key));
		dottie.set(obj, key, value);
		return obj as T;
	};
}
