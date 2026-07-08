export * from "./b2b-data";
// Re-export blogs as insights for B2B naming alignment
import { blogs } from "./b2b-data";
export { blogs as insights };
