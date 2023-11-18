

import "styles/globals.css"
import { Inter } from 'next/font/google'
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MAGIC MEDICS',
  description: 'All medical solution',
}

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body className={inter.className}>
      <Provider>
        
     
       
         
           
          {children}
      </Provider>
    </body>
  </html>
);

export default RootLayout;