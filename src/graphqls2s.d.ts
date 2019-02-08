import { getQueryAST, buildQuery } from './utilities';
import { extractGraphMetadata } from './graphmetadata';

import { SchemaAST } from './utilities';

interface GraphQLS2S {
  getSchemaAST(graphQlSchema: string): SchemaAST[];
  transpileSchema(graphQlSchema: string): string;
  extractGraphMetadata: typeof extractGraphMetadata;
  getGenericAlias(s: string): (genName: string) => string;
  getQueryAST: typeof getQueryAST;
  buildQuery: typeof buildQuery;
  isTypeGeneric(type: string, genericLetter: string): boolean;
}

export declare const graphqls2s: GraphQLS2S;
