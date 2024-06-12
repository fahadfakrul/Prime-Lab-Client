

const SectionTitle = ({heading,subheading}) => {
    return (
        <div className="mx-auto text-center my-8 ">
            <p className="uppercase text-4xl text-[#2d3663] py-4 font-niramit font-medium">{heading}</p>
            <p className="text-xl mt-3 text-black">{subheading}</p>
        </div>
    );
};

export default SectionTitle;