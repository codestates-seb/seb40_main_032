package travelRepo.global.aop.logtracer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class LogTrace {

    private static final String START_PREFIX = "-->";
    private static final String COMPLETE_PREFIX = "<--";
    private static final String EX_PREFIX = "<X-";

    private ThreadLocal<TraceStatus> traceStatusHolder = new ThreadLocal<>();

    public TraceStatus begin(String message) {

        syncTraceStatus(message);

        TraceStatus traceStatus = traceStatusHolder.get();
        traceStatus.setStartTimeMs(System.currentTimeMillis());
        log.info("[{}] {}{}", traceStatus.getId(), addSpace(START_PREFIX, traceStatus.getLevel()), message);

        return traceStatus;
    }

    public void end(TraceStatus status) {
        complete(status, null);
    }

    public void exception(TraceStatus status, Exception e) {
        complete(status, e);
    }

    private void complete(TraceStatus status, Exception e) {

        Long stopTimeMs = System.currentTimeMillis();
        float resultTimeS = (stopTimeMs - status.getStartTimeMsStack().pop()) / 1000F;

        String traceId = status.getId();
        if (e == null) {
            log.info("[{}] {}{} time = {}s", traceId, addSpace(COMPLETE_PREFIX, status.getLevel()),
                    status.getMessageStack().pop(), resultTimeS);
        } else {
            log.info("[{}] {}{} time = {}s", traceId, addSpace(EX_PREFIX, status.getLevel()),
                    status.getMessageStack().pop(), resultTimeS);
            log.info("[{}] ex = {}", traceId, e.toString());
        }

        releaseTraceStatus();
    }

    private void releaseTraceStatus() {

        TraceStatus traceStatus = traceStatusHolder.get();
        if (traceStatus.isFirstLevel()) {
            traceStatusHolder.remove();
        } else {
            traceStatus.bePreviousId();
        }
    }

    private String addSpace(String prefix, int level) {

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < level; i++) {
            sb.append((i == level - 1) ? "|" + prefix : "|   ");
        }
        return sb.toString();
    }

    private void syncTraceStatus(String message) {

        TraceStatus traceStatus = traceStatusHolder.get();
        if (traceStatus == null) {
            System.out.println();
            log.info("begin LogTrace");
            traceStatusHolder.set(new TraceStatus(message));
        } else {
            traceStatus.beNextLevel(message);
        }
    }

}
