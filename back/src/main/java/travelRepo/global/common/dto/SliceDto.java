package travelRepo.global.common.dto;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import java.util.List;

@Data
public class SliceDto<T> {

    private List<T> content;

    private int sliceNumber;

    private int size;

    private boolean hasNext;

    private int numberOfElements;

    public SliceDto(Slice<T> slice) {
        this.content = slice.getContent();
        this.sliceNumber = slice.getNumber() + 1;
        this.size = slice.getSize();
        this.hasNext = slice.hasNext();
        this.numberOfElements = slice.getNumberOfElements();
    }
}
