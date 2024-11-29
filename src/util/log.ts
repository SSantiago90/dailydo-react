function generateColor(inputString: string) {
  // Calculate the base for RGB values limit to 6 characters
  // Generate RGB values based on the input string
  let r = 0;
  let g = 0;
  let b = 0;

  
  r = ((inputString.charCodeAt(0) % 26) * 16 + (inputString.charCodeAt(1) % 26)) % 256;
  g = ((inputString.charCodeAt(2) % 26) * 16 + (inputString.charCodeAt(3) % 26)) % 256;
  b = ((inputString.charCodeAt(4) % 26) * 16 + (inputString.charCodeAt(5) % 26)) % 256;


  // Ensure RGB values stay within 0-255 range
  r = Math.max(0, Math.min(r, 255));
  g = Math.max(0, Math.min(g, 255));
  b = Math.max(0, Math.min(b, 255));

  if(r + g + b < 450) {   
      if ( r < 110) r = 255;
      else if ( g < 110) g = 255;
      else b = 255;    
  }

  // Format the color string
  return `color: rgb(${r}, ${g}, ${b})`;
}

export default function newLogger(message: string) {  
  return function log(...args: unknown[]) {
    if (args.length === 1) return args[0];
    
    const fulltext = args.map((arg) => {
      if (arg instanceof Date) return arg.toISOString();
      if (typeof arg === 'object') return JSON.stringify(arg);
      return arg;
    }
    ).join(' - ');
      

    console.log(`%c [${message}] `, generateColor(message), fulltext);
  }
}