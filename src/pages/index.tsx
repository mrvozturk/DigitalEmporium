import type { Metadata } from 'next';

import ExamplePage from './examplePage';

export default function IndexPage() {
  return <ExamplePage />;
}

export const metadata: Metadata = {
  title: 'Redux Toolkit'
};
