interface Parent {
  type: string;
  name: string;
  metadata?: {
    type: string;
    name: string;
  };
}

interface Metadata {
  name: string;
  body: string;
  schemaType: string;
  schemaName: string;
  parent: Parent | null;
}

interface DirectiveValue {
  id: string;
  value: string;
}

interface GraphMetadata {
  name: string;
  body: string;
  schemaType: string;
  schemaName: string;
  parent: string;
  directive: string;
  directiveValues: DirectiveValue[];
}

interface BlockProps {
  comments: string;
  details: {
    name: string;
    metadata: Metadata | null;
    params: string | null;
    result: {
      originName: string;
      directive?: string;
      isGen: boolean;
      dependsOnParent: boolean;
      metadata: GraphMetadata[] & { escSchema: string };
      genericParentTypes: unknown | null;
      name: string;
    };
  };
  value: string;
}

interface SchemaAST {
  type: string;
  extend?: boolean;
  name: string;
  metadata: Metadata | null;
  directive: true | string | null;
  genericType: boolean | null;
  blockProps: BlockProps[];
  inherits: SchemaAST[] | null;
  implements: string[] | null;
  comments?: string;
}

export declare function buildQuery(
  operation?: QueryAST | null,
  skipOperationParsing?: boolean
): string;

export declare function getQueryAST(
  query: string,
  operationName: string | null,
  schemaAST: SchemaAST[],
  options?: { defrag?: boolean }
): QueryAST;

interface Variable {
  name: string;
  type: string;
}

interface Arg {
  name: string;
  value: {
    kind: string;
    value: string | Arg[];
  };
}

interface Property {
  name: string;
  kind: string;
  type: string;
  metadata: Metadata | null;
  isNode: boolean;
  edge: unknown | null;
  args: Arg[];
  properties: Property[];
}

type Predicate<T> = (fn: (property: Property) => boolean) => T;
interface PropertyPath {
  property: string;
  type: string;
}
interface QueryAST {
  type: string;
  name: string | null;
  variables: Variable[];
  properties: Property[];
  fragments: unknown | null;
  filter: Predicate<QueryAST | null>;
  some: Predicate<boolean>;
  propertyPaths: Predicate<PropertyPath[]>;
  containsProp(propPath: string | RegExp): boolean;
}
