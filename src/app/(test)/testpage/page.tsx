import { Metadata } from 'next';
import React from 'react';

type Props = {};
export const metadata: Metadata = {
  title: 'Test',
};

const TestPage = (props: Props) => {
  return <main>TestPage</main>;
};

export default TestPage;
