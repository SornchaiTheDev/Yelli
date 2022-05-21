import Album from './Album';

function Events() {
  const _events = [
    {
      name: 'Home Party',
      amount: 4,
      id: 'abcd',
      imgset: [
        {
          src: 'https://images.unsplash.com/photo-1638913662295-9630035ef770?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
        },
        { src: null },
        { src: null },
        { src: null },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-14 p-4">
      {_events.map(({ name, amount, imgset, id }) => (
        <Album key={id} name={name} amount={amount} imgset={imgset} id={id} />
      ))}
    </div>
  );
}

export default Events;
