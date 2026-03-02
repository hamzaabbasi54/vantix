function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}>
          <div className="chat-bubble w-32" style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,92,75,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}></div>
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;