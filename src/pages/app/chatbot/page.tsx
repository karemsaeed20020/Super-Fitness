// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Input } from '@/components/ui/input';
// import type { Message } from '@/lib/types/chatbot';
// import { Pencil, Menu } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';



// export default function SmartCoachChat() {
//   //  states
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       text: 'Hello  How can I assist you today?',
//       sender: 'bot',
//     },
//   ]);

//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   //  Auto scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   //  Rule-based logic + APIs
//   const sendMessageToAPI = async (userMessage: string) => {
//     try {
//       setLoading(true);
//       const msg = userMessage.toLowerCase();

//       //  Exercises API
//       if (msg.includes('exercise') || msg.includes('تمرين')) {
//         const res = await fetch('https://fitness.elevateegy.com/api/v1/exercises');
//         const data = await res.json();

//         if (data?.length) {
//           return ` Exercise: ${data[0].name}
// Sets: ${data[0].sets}
// Reps: ${data[0].reps}`;
//         }

//         return 'No exercises found ';
//       }

//       //  levels API
//       if (msg.includes('level') || msg.includes('مستوى')) {
//         const res = await fetch('https://fitness.elevateegy.com/api/v1/levels');
//         const data = await res.json();

//         if (data?.length) {
//           return ` Level: ${data.levels[0].name}`;
//         }
//       }

//       //  Diet API
//       if (
//         msg.includes('diet') ||
//         msg.includes('اكل') ||
//         msg.includes('weight') ||
//         msg.includes('تخس')
//       ) {
//         const res = await fetch('www.themealdb.com/api/json/v1/1/categories.php');
//         const data = await res.json();

//         if (data) {
//           return ` Meal: ${data.categories[0].name}`;
//         }

//         return 'No meals found ';
//       }

//       //  Plans API
//       if (msg.includes('muscle') || msg.includes('عضلات')) {
//         const res = await fetch('https://fitness.elevateegy.com/api/v1/muscles');
//         const data = await res.json();
//         console.log(data);
        
//         if (data) {
//           return ` Muscle: ${data.musclesGroup[0].name}`;
//         }

//         return 'No muscles found ';
//       }

//       //  fallback
//       return 'I can help you with  exercises,  diet, or  plans. Try asking about them ';

//     } catch (error) {
//       return` Something went wrong  ${error}` ;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = input;

//     // add user message
//     setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
//     setInput('');

//     // get bot reply
//     const botReply = await sendMessageToAPI(userMessage);

//     // add bot reply
//     setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
//   };

//   return (
//     <div
//       className="relative mx-auto flex h-125 w-full max-w-md flex-col overflow-hidden border-x border-gray-800 font-sans text-white"
//       style={{ backgroundImage: "url('/assets/images/bot-background.png')" }}
//     >
//       {/* Header */}
//       <header className="flex items-center justify-between p-6 pt-10">
//         <h1 className="text-2xl font-bold tracking-tight">Smart Coach</h1>
//         <Menu className="h-8 w-8 cursor-pointer text-orange-600" />
//       </header>

//       {/* Chat Area */}
//       <main className="flex-1 space-y-6 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex items-start gap-3 ${
//               msg.sender === 'user' ? 'flex-row-reverse' : ''
//             }`}
//           >
//             <Avatar className="h-10 w-10">
//               {msg.sender === 'bot' ? (
//                 <AvatarImage src="/assets/images/ai-avatar.png" />
//               ) : (
//                 <AvatarImage src="/user-icon.png" />
//               )}
//               <AvatarFallback>{msg.sender}</AvatarFallback>
//             </Avatar>

//             <div
//               className={`max-w-[80%] whitespace-pre-line rounded-2xl p-3 ${
//                 msg.sender === 'bot'
//                   ? 'rounded-tl-none bg-zinc-900/80'
//                   : 'rounded-tr-none bg-orange-800/90'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <p className="text-sm text-gray-400">🤖 Typing...</p>
//         )}

//         <div ref={chatEndRef} />
//       </main>

//       {/* Input */}
//       <footer className="p-6 pb-10">
//         <div className="relative">
//           <Pencil className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-orange-600" />

//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Ask me anything..."
//             className="bg-transparent pl-10 text-zinc-50!"
//           />
//         </div>
//       </footer>
//     </div>
//   );
// }

import SmartCoachChat from './_components/SmartCoachChat'

export default function page() {
  return (
    <div>
      <SmartCoachChat />
    </div>
  )
}
