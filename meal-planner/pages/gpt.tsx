import { Inter } from 'next/font/google';
import ChatGPTForm from '@/components/Form/ChatGPTForm';

const inter = Inter({ subsets: ['latin'] });

export default function OpenAi() {
	return (
		<main className={inter.className}>
			<ChatGPTForm />
		</main>
	);
}
