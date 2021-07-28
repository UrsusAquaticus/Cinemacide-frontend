import { createTheme } from "@material-ui/core/styles";

const headerTheme = createTheme({
	palette: {
		type: 'dark',
		primary: {
		  main: '#212121',
		},
		secondary: {
		  main: '#b71c1c',
		},
		error: {
		  main: '#ff3d00',
		},
	  },
});

const contentTheme = createTheme({
	palette: {
		type: 'dark',
		primary: {
		  main: '#212121',
		},
		secondary: {
		  main: '#b71c1c',
		},
		error: {
		  main: '#ff3d00',
		},
	  },
});

export { headerTheme };
