const TestsCards = ({test}) => {
    const {image,category,title,date,slots,shortDescription}=test;
  return (
    <article className="flex flex-col rounded-lg shadow-xl dark:bg-gray-50">
      <a
        rel="noopener noreferrer"
        href="#"
        aria-label="Te nulla oportere reprimique his dolorum"
      >
        <img
          alt=""
          className="object-cover  w-full rounded-t-lg h-56 dark:bg-gray-500"
          src={image}
        />
      </a>
      <div className="flex flex-col flex-1 p-6">
        
        <a
          rel="noopener noreferrer"
          href="#"
          className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
        >
          {category}
        </a>
        <h3 className="py-2 text-lg font-semibold leading-snug">
         {title}
        </h3>
        <div className="flex-1">
        <p >{shortDescription}</p>
        </div>
        <div className="flex-1 mt-3">
            <p>Date: {date}</p>
            <p>Slots: {slots} left</p>
        </div>
        <button className="btn btn-primary">Details</button>
      </div>
    </article>
  );
};

export default TestsCards;
