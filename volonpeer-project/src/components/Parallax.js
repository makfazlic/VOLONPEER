import bg2 from '../images/bg2.jpg';

export default function Parallax() {
    return (
        <div
            class="flex items-center justify-end mb-12 bg-fixed bg-center bg-cover mt-28" style={{
                backgroundImage: `url(${bg2})`,
                height: "700px"
            }}
        >
            <div className="p-10 text-2xl text-black bg-white rounded-xl w-full xl:w-2/5 xl:mr-48 m-10 xl:m-0 flex flex-col justify-center items-center" style={{ height: "400px" }}>
                <h1 className="font-bold text-xl xl:text-4xl mb-10">Share your 
                <span className="text-blueish6"> skills</span> and build 
                <span className="text-greenish6"> trust</span></h1>
                <p className="text-center xl:text-xl text-sm"> There are many minor problems which each member of the community faces from day to day bases.
                    You can use your skills to help your community members, and form connections with your them.</p>
            </div>
        </div>
    );
}