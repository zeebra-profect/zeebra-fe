import testImg from "../../img/test/testImg.png";
import { useNavigate } from "react-router-dom";

const subCategory = [
  { id: 1, name: "카테고리1", img: testImg },
  { id: 2, name: "카테고리2", img: testImg },
  { id: 3, name: "카테고리3", img: testImg },
  { id: 4, name: "카테고리4", img: testImg },
  { id: 5, name: "카테고리5", img: testImg },
  { id: 6, name: "카테고리6", img: testImg },
  { id: 7, name: "카테고리7", img: testImg },
  { id: 8, name: "카테고리8", img: testImg },
  { id: 9, name: "카테고리9", img: testImg },
];

function SubCategoryItem() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center w-fit h-fit gap-12 ">
      {subCategory.map((item) => (
        <button
          onClick={() => navigate("/shopPage/{item.name}")}
          key={item.id}
          className="flex flex-col items-center w-[8vh] cursor-pointer"
        >
          <img src={item.img} alt={String(item.id)} />
          <p className="mb-2 font-extralight">{item.name}</p>
        </button>
      ))}
    </div>
  );
}

export default SubCategoryItem;

<p className="text-base font-extralight font-family-pretendard"></p>;
