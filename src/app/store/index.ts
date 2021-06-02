import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./reducers/hydration.reducer";

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
