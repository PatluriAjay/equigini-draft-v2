// StatCards.js
export default function GenericPage() {
  const cards = [
    { name: 'Work in Progress', property: "This page is currently under development." },
  ];
  return (
    <>
      {cards.map((card, idx) => (
        <div key={idx} className="rounded-2xl">
          <div className="text-lg font-semibold text-gray-800 mb-2">{card.name}</div>
          <div className="text-md text-gray-500">{card.property}</div>
          {/* <div className="flex items-end justify-between mt-4">
            <div>
              <div className="text-lg font-bold">{card.duration}</div>
              <div className="text-xs text-gray-400">{card.price}</div>
            </div>
            <svg width="60" height="24" viewBox="0 0 60 24"><path d="M0,20 Q20,10 40,20 Q50,24 60,10" stroke="#60a5fa" strokeWidth="2" fill="none"/></svg>
          </div> */}
        </div>
      ))}
    </>
  );
}
