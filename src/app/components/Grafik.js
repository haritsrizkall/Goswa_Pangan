export default function Grafik() {
  return (
    <>
      <div class="w-full bg-neutral-primary-soft border border-black rounded-3xl shadow-xs p-4 md:p-6">
        <div class="flex justify-between mb-4 md:mb-6">
          <div class="grid gap-4 grid-cols-2">
            <div class="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-chart-primary rounded-xs me-2"></span>
                <span class="text-[13px] text-muted-foreground-2">Income</span>
              </div>
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-chart-6 rounded-xs me-2"></span>
                <span class="text-[13px] text-muted-foreground-2">Outcome</span>
              </div>
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-chart-9 rounded-xs me-2"></span>
                <span class="text-[13px] text-muted-foreground-2">Others</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div id="line-chart"></div>
      </div>
    </>
  );
}
