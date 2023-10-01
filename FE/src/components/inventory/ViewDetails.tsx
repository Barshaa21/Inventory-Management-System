import Item from "./Item";
import { useSelector } from "react-redux";

export default function ViewStock() {
  const data = useSelector((c: any) => {
    console.log(c.admin.value);
    return c.admin.value;
  });

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });
  return (
    <div>
      <div
        className={`${
          theme == "gray-200" ? "bg-gray-300" : "bg-hero-pattern bg-cover"
        }`}
      >
        <p className="text-3xl">{data}</p>
        <section className="ml-[15rem]">
          <div className="flex">
            <Item />
          </div>
        </section>
      </div>
    </div>
  );
}
