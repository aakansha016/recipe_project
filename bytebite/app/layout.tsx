export const metadata = {
  title: 'ByteBite - Your AI Sous-Chef',
  description: 'Instantly craft personalized, creative recipes tailored to your needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}