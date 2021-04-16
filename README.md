# vue-display-tools

This project aims to developp often used features as vue components.  
Available now:  
- Checkboxes
- Editable labels
- Thumbnail - props :  
    - content - default: "..." 
    - visible - default: true // visibility  
    - autoHide - default: false  // to use auto hide, v-model with a boolean for visibility must exist in parent component  
    - autoHideTime - , // // set timeout before close in ms  
    - closeCross - default: false //displays cross on the right to close thumbnail  
    - position - default: "right // right, left, center available, thumbnail will always be on the bottom of th screen  
    - thumbnailType - default: "neutral" // "neutral", "success", "error" - changes the background color  
    - detailsButton - default: false
    - width - default: "auto" 

All of theses are vue component files. To use them in your project, simply copy the file in your components folder and import it.

Just download the files and run 'npm run serve' to test it

Notes :  
- The component files styles are scss. To use scss in vue, use 'npm install sass-loader@^10.1.1 sass' !! Pay attention to the version indication, if omitted you'll have an error : 'TypeError: this.getOptions is not a function'



## Project setup
```
simply fork or download this repository
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
