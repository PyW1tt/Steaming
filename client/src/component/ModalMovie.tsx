import React from "react";
import { useDataMovie } from "../context/dataMovieContext";

function ModalMovie() {
  const { isModalOpen, dataMovie } = useDataMovie();

  if (!isModalOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 "
      style={{ background: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="w-[560px] bg-[#28262d] h-full rounded-2xl opacity-1 overflow-y-auto">
        <div className="px-10 py-6 border-b justify-between items-center gap-2.5 flex">
          <div className="text-headline3">Booking</div>
        </div>
        <div className="m-10">{dataMovie.title}</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vero
          obcaecati id officiis. Provident et reprehenderit corrupti. Assumenda
          iusto quam architecto fuga quos, et voluptatem maxime libero dolorum a
          doloribus mollitia dolore cumque, beatae doloremque quas, laudantium
          consectetur impedit aut iure debitis amet. Accusantium corporis,
          laboriosam dolore voluptatem illum vero et aperiam maxime! Quos
          eligendi ratione nesciunt vitae distinctio, quod excepturi molestias a
          ipsam culpa aut tempore saepe ducimus quidem vero animi perspiciatis
          assumenda accusamus, sed veniam corporis nihil consequatur. Eos
          corrupti quaerat nam inventore? Dolorem officia ipsum vel nam quaerat
          molestiae ipsa dolore dicta nobis iusto rerum maiores, provident
          explicabo error quo veritatis repudiandae praesentium. Ipsum officiis
          ducimus saepe quam nemo repellat doloribus! Iusto omnis rerum
          repudiandae ad odit quos corrupti voluptatibus ullam veniam voluptatem
          in labore nobis, libero distinctio sequi reprehenderit facilis culpa
          ab autem aliquid. Quisquam, aperiam autem alias, dolor nam nemo,
          placeat quibusdam numquam illo iusto sed tenetur quaerat cumque
          voluptatibus? Unde autem magni placeat necessitatibus, facilis
          temporibus voluptas modi, itaque dolores nostrum praesentium minima
          doloribus maiores enim! Rerum aliquam odit minus a. In quae facere
          obcaecati nesciunt nostrum, beatae voluptatem inventore iure amet
          mollitia illo ullam, doloribus maiores optio officiis cupiditate
          quidem error natus nobis? Quisquam exercitationem laudantium dolorem
          nesciunt iusto eaque totam vel blanditiis quas expedita, possimus ut
          officiis consequuntur cumque aliquam fugit, alias pariatur aspernatur
          reprehenderit at commodi consectetur cupiditate autem. Omnis, qui, at
          velit error aperiam dolor non enim id sit voluptatem deleniti optio
          explicabo nostrum. Ipsam id expedita veritatis fuga quam quaerat
          voluptatum at. Eius recusandae totam magnam ullam. Quasi, animi
          repudiandae dolorum nisi nihil asperiores quam sunt omnis ratione
          impedit quae alias quibusdam explicabo. Modi, nostrum ratione neque
          facere asperiores incidunt optio nemo! Eaque minus distinctio,
          suscipit impedit eius consequatur velit sed molestias. Saepe nisi
          natus laboriosam! Error praesentium fuga tempore voluptas corporis
          dolorem sunt soluta eaque, corrupti possimus ipsam eos, aliquam
          distinctio optio vitae non deleniti numquam necessitatibus. Eos
          voluptatem eum aperiam assumenda sit magni vero nesciunt odio at
          consequatur? Delectus vel excepturi voluptate repudiandae obcaecati
          facilis aut earum consectetur dolorem, placeat veritatis impedit!
          Fugiat consequatur, veritatis asperiores nemo deleniti accusantium
          ullam omnis, numquam dicta, animi totam culpa amet maiores provident
          delectus? Dolore distinctio tempora ut suscipit. Neque doloremque
          alias repellendus. Labore, inventore error, necessitatibus quibusdam
          ex ipsa ullam cupiditate perspiciatis doloribus pariatur
          reprehenderit, consectetur minus commodi illum assumenda quidem
          accusamus. Et explicabo autem quos non placeat alias aliquam illum
          quas ut atque veritatis nesciunt magni voluptatibus ea, reprehenderit
          perferendis, dolores sapiente vero, iure quasi doloribus sunt minima
          eum. Fugiat tenetur cumque necessitatibus reprehenderit perferendis
          atque blanditiis animi qui ipsam sequi repudiandae asperiores
          laboriosam quibusdam vel libero, tempore autem beatae adipisci sint
          veniam cupiditate distinctio! Mollitia, veritatis maxime officiis quis
          optio eum expedita quidem eius ad quaerat blanditiis nisi distinctio
          est quo quos aspernatur iure. Consequuntur, eos optio? Quod numquam ea
          qui ab quae! Rerum optio, exercitationem possimus eius asperiores
          omnis quod voluptates enim, aliquid dolores dicta eaque, adipisci fuga
          consequatur est labore ut! Optio obcaecati est consectetur porro.
        </p>
      </div>
    </div>
  );
}

export default ModalMovie;
