/// <reference types="node" />
declare module 'react-keyboard-event-handler' {
  const defaultExportedValue: React.ComponentType<{
    onKeyEvent: any;
    handleKeys?: string[];
    handleEventType?: 'keydown' | 'keyup' | 'keypress';
    handleFocusableElements?: boolean;
    isDisabled?: boolean;
    isExclusive?: boolean;
    children?: any;
  }>;
  export default defaultExportedValue;
}
