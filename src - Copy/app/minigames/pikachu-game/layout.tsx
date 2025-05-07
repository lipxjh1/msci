import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pikachu Game',
  description: 'Trò chơi Pikachu kết nối các Pokémon giống nhau',
};

export default function PikachuGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
} 