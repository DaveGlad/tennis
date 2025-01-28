import { CircleCheck } from 'lucide-react';

function ExerciceIntegration() {
   return (
      <div className="min-h-[400px] bg-[#FAFAFA] p-6 flex items-center justify-center">
         <div className="w-[320px] bg-white rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-purple-500/10 text-purple-500 font-bold text-[13px]  px-4 py-1.5 rounded-full">
                  User Interface
               </span>
            </div>

            <h2 className="text-[#111827] text-[20px] font-semibold mb-2">
               Service Page Website
            </h2>

            <p className="text-[#6B7280] text-[14px] mb-4">
               Make a page display about services for websites company with blue
               and red colors
            </p>

            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center">
                  <CircleCheck className="size-3.5 text-[#6B7280]" />
                  <span className="text-[#6B7280] text-[13px] ml-1">0/20</span>
               </div>

               <div className="flex items-center">
                  <div className="flex -space-x-2">
                     <img
                        src="https://api.dicebear.com/6.x/avataaars/svg?seed=1"
                        alt="Member 1"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        width={24}
                        height={24}
                     />
                     <img
                        src="https://api.dicebear.com/6.x/avataaars/svg?seed=2"
                        alt="Member 2"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        width={24}
                        height={24}
                     />
                     <img
                        src="https://api.dicebear.com/6.x/avataaars/svg?seed=3"
                        alt="Member 3"
                        className="w-6 h-6 rounded-full border-2 border-white"
                        width={24}
                        height={24}
                     />
                  </div>

                  <button className="bg-[#3B82F6] text-white text-[13px] font-medium px-4 py-1.5 rounded-full hover:bg-[#2563EB] transition-colors">
                     Invite
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-5 border justify-center py-2.5 rounded-full">
               <div className="flex items-center gap-1.5">
                  <svg
                     className="w-4 h-4 text-[#6B7280]"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                     ></path>
                  </svg>
                  <span className="text-[#6B7280] text-[13px]">
                     4 Attachment
                  </span>
               </div>

               <div className="bg-[#c4cbd8] w-[1px] h-3" />

               <div className="flex items-center gap-1.5">
                  <svg
                     className="w-4 h-4 text-[#6B7280]"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                     ></path>
                  </svg>
                  <span className="text-[#6B7280] text-[13px]">10 Comment</span>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ExerciceIntegration;
