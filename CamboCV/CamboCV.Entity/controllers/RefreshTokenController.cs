using System.Threading.Tasks;
using System.Web.Http;
using CamboCV.Entity.repository;

namespace CamboCV.Entity.controller
{
    public class RefreshTokenController : ApiController
    {

        private OAuthRepository _repo = null;

        public RefreshTokenController()
        {
            _repo = new OAuthRepository();
        }

        [Authorize(Users="Admin")]
        [HttpGet]
        [Route("api/RefreshTokens")]
        public IHttpActionResult Get()
        {
            return Ok(_repo.GetAllRefreshTokens());
        }

        //[Authorize(Users = "Admin")]
        [AllowAnonymous]
        [HttpPost]
        [Route("api/RefreshTokens/Delete")]
        public async Task<IHttpActionResult> Delete(string tokenId)
        {
            var result = await _repo.RemoveRefreshToken(tokenId);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Token Id does not exist");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
