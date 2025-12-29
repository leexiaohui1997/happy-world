import { defineAsyncComponent } from 'vue';

export enum LayoutType {
  None,
}

export const layoutComponents: Record<LayoutType, ReturnType<typeof defineAsyncComponent> | null> =
  {
    [LayoutType.None]: null,
  };
