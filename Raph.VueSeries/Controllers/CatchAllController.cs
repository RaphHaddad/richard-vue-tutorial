using Microsoft.AspNetCore.Mvc;

namespace Raph.VueSeries.Controllers
{
    public class CatchAllController : Controller
    {
        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        }
    }
}