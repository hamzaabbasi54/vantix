function UsersLoadingSkeleton() {
  return (
    <div className="space-y-1.5">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-3 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center space-x-3">
            <div className="size-10 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
            <div className="flex-1">
              <div className="h-3.5 rounded-lg w-3/4 mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
              <div className="h-3 rounded-lg w-1/2" style={{ background: 'rgba(255,255,255,0.03)' }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;