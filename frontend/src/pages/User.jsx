import Header from "../component/Header";
import UserTable from "../component/user/UserTable";

const User = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Karyawan" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        <UserTable />
      </main>
    </div>
  );
};

export default User;
