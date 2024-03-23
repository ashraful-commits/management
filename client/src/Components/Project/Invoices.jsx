//=========================================invoices function
const Invoices = ({ Due, number, date }) => {
  return (
    <div className="border rounded-md pb-[10px] p-[10px] flex justify-between items-center">
      <div className="flex flex-col">
        <p className="text-2xs  text-haiti  font -['work_sans']">
          Invoice issued to:
        </p>
        <p className="text-sm  text-haiti  font-['work_sans'] font-bold">
          New Patient Group
        </p>
        <div className="flex justify-between">
          <div>
            <p className="text-2xs  mt-1 text-haiti  font -['work_sans']">
              amount due
            </p>
            <p className="text-sm  text-haiti  font-['work_sans'] font-bold">
              ${Due ? Due : 0}
            </p>
          </div>
          <div>
            <p className="text-2xs  text-haiti  font -['work_sans']">Due by</p>
            <p className="text-2xs  text-[#626263] font-['work_sans'] ">
              {date ? date : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <button className="border bg-gray-300 text-xs  font-['work_sans'] px-[5px] flex justify-center items-center rounded-md">
          view Invoice
        </button>
        <p className="text-2xs  text-haiti  font -['work_sans']">Invoice No</p>
        <p className="text-sm  text-haiti  font-['work_sans'] font-bold">
          {number ? number : 0}
        </p>
      </div>
    </div>
  );
};

export default Invoices;
