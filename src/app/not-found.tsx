import Link from "next/link";
import { services } from "@/data/services";

/**
 * 404.
 *
 * 막다른 길로 끝내지 않는다. 여기까지 온 사람은 복지 정보를 찾던 중이므로,
 * 가장 많이 찾는 지원과 자가진단으로 이어 준다.
 */
const popular = services.slice(0, 5);

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-8 text-center">
      <p className="text-5xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">
        찾으시는 페이지가 없습니다
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        주소가 바뀌었거나, 수록이 중단된 서비스일 수 있습니다.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href="/service"
          className="rounded-xl bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110"
        >
          많이 찾는 지원 보기
        </Link>
        <Link
          href="/check"
          className="rounded-xl border border-line bg-white px-5 py-3 font-bold text-ink transition hover:border-brand hover:text-brand"
        >
          자격 자가진단
        </Link>
      </div>

      {popular.length > 0 && (
        <section className="mt-10 text-left">
          <h2 className="mb-3 text-sm font-bold text-muted">
            사람들이 많이 찾는 지원
          </h2>
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {popular.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/service/${s.id}`}
                  className="block px-4 py-3 text-sm hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
