import "./globals.css";


export const metadata = {
  title: "Estancia",
  description: "Aplicación de salón estancia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
