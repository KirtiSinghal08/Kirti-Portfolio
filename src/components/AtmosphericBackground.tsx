export function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[10%] -left-[5%] size-[600px] rounded-full bg-lavender/40 blur-[120px] animate-drift" />
      <div
        className="absolute bottom-[5%] -right-[5%] size-[500px] rounded-full bg-petal/60 blur-[100px] animate-drift"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute top-[20%] right-[10%] size-[400px] rounded-full bg-azure/50 blur-[90px] animate-drift"
        style={{ animationDelay: "-10s" }}
      />
      <div
        className="absolute bottom-[30%] left-[20%] size-[350px] rounded-full bg-mint/30 blur-[100px] animate-drift"
        style={{ animationDelay: "-15s" }}
      />
    </div>
  );
}
