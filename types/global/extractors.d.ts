/**
 * Extract entries from object
 *
 * @typeParam Type - Object to extract entries from
 */
type Entries<
  Type extends Record<string, unknown>,
> = Array<[keyof Type, Type[keyof Type]]>

/**
 * Extract resolution type from promise
 *
 * @typeParam Type - Promise to extract resolution from
 */
type Awaited<Type> = Type extends Promise<infer ResolveType>
  ? Awaited<ResolveType>
  : Type
