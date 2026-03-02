// Animated gradient border container
function BorderAnimatedContainer({ children }) {
    return (
        <div className="w-full h-full [background:linear-gradient(45deg,#111111,
        #1a1a1a_50%,#111111)_padding-box,
        conic-gradient(from_var(--border-angle),rgba(255,255,255,0.05)_80%,
        _#00A884_86%,_#00C897_90%,
        _#00A884_94%,rgba(255,255,255,0.05))_border-box]
         rounded-2xl border border-transparent animate-border 
         flex overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            {children}
        </div>
    );
}
export default BorderAnimatedContainer;