import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/marketingPage');  // Changed from '/landing' to match your folder
}