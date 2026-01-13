interface WelcomeScreenProps {
    modelName: string;
}

export function WelcomeScreen({ modelName }: WelcomeScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-6 px-4">
            <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                        <path d="M5 7h4v4H5V7zm8 0h2v2h-2V7zm-8 4h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2z" fillOpacity="0.5" />
                    </svg>
                </div>

                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Xin chào
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Tôi là <span className="font-semibold text-gray-300">{modelName}</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                <div className="p-4 rounded-xl bg-gray-700 border border-gray-600 hover:border-blue-500 transition-all cursor-help">
                    <svg className="w-6 h-6 text-blue-400 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h4V3a1 1 0 112 0v1h4a2 2 0 012 2v2h1a1 1 0 110 2h-1v4h1a1 1 0 110 2h-1v4a2 2 0 01-2 2h-4v1a1 1 0 11-2 0v-1H8v1a1 1 0 11-2 0v-1H4a2 2 0 01-2-2v-4H1a1 1 0 110-2h1V9H1a1 1 0 010-2h1V5a2 2 0 012-2h4V3a1 1 0 011-1zm9 2H4v10h12V4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-400">Đặt câu hỏi</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-700 border border-gray-600 hover:border-purple-500 transition-all cursor-help">
                    <svg className="w-6 h-6 text-purple-400 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    <p className="text-xs text-gray-400">Tìm kiếm thông tin</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-700 border border-gray-600 hover:border-green-500 transition-all cursor-help">
                    <svg className="w-6 h-6 text-green-400 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <p className="text-xs text-gray-400">Sáng tạo</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-700 border border-gray-600 hover:border-pink-500 transition-all cursor-help">
                    <svg className="w-6 h-6 text-pink-400 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    </svg>
                    <p className="text-xs text-gray-400">Phân tích</p>
                </div>
            </div>

            <p className="text-gray-500 text-xs mt-4 max-w-sm">
                Tôi có thể giúp bạn với các câu hỏi, sáng tạo nội dung, và giải quyết vấn đề. Hãy bắt đầu cuộc trò chuyện!
            </p>
        </div>
    );
}
