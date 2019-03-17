export type Theme = {
  palette: {
    primaryColor: string;
  };

  layout: {
    main: {
      margin: number;
    };
  };
};

const baseTheme: Theme = {
  palette: {
    primaryColor: '#e6f7ff'
  },
  layout: {
    main: {
      margin: 48
    }
  }
};

export default baseTheme;
