
import { useRouter } from 'next/navigation';


const HeaderComponent = () =>
{
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <nav className="side-nav">
      <ul>
        <li><a href='' onClick={(e)=>handleClick(e, "dashboard")}>Dashboard</a></li>
        <li><a href='' onClick={(e)=>handleClick(e, "list")}>List</a></li>
      </ul>
    </nav>
  )};

export default HeaderComponent;
